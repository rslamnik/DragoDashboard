import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

import { AppLayout, Table, Button, TableContainer, PaginationContainer, Modal, Pagination, DEFAULT_PAGE_SIZE } from "lib/components";
import { usePagination } from "lib/hooks";
import { useAppRoutes, generateLink } from "AppRoutes";
import { useKeywords } from "./useKeywords";
import { useDeleteKeyword } from "./useDeleteKeyword";
import API from "lib/utils";
import { useNotifications, ALERT_VARIANTS } from "lib/components/Notifications";

const columns = [
    {
        label: "keyword",
        name: "Keyword",
        sortBy: "keyword",
        sortable: false,
        sortOrder: null,
    },
    {
        label: "nation",
        name: "Nation",
        sortBy: "nation",
        sortable: false,
        sortOrder: null,
    },
    {
        label: "active",
        name: "Active",
        sortBy: "active",
        sortable: false,
        sortOrder: null,
    },
    {
        label: "numberOfRep",
        name: "Number Of Rep",
        sortBy: "numberOfRep",
        sortable: false,
        sortOrder: null,
    },
    {
        label: "organic",
        name: "Organic",
        sortBy: "organic",
        sortable: false,
        sortOrder: null,
    },
    {
        label: "numberOfAdsClicks",
        name: "Number of Ads Click",
        sortBy: "numberOfAdsClicks",
        sortable: false,
        sortOrder: null,
    },
    {
        label: "adsOnly",
        name: "Ads Only",
        sortBy: "adsOnly",
        sortable: false,
        sortOrder: null,
    },
    {
        name: "",
    },
];

const Keywords = () => {
    let { categoryId: id } = useParams();
    const { routes } = useAppRoutes();
    const navigate = useNavigate();
    const { showNotification } = useNotifications();

    const [deletingKeywordId, setDeletingKeywordId] = useState(-1);

    const { data: keywords, isSuccess, isLoading, isFetching, refetch } = useKeywords(id);
    const { deleteKeyword, isLoading: isLoadingDeleteKeyword } = useDeleteKeyword(id);

    const [data, setData] = useState();
    const { page, setPage, count, setCount, maxPages, setMaxPages } = usePagination();
    const [file, setFile] = useState();

    const onFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const onFileUpload = async () => {
        const formData = new FormData();

        formData.append(
            "file",
            file
        );

        try {
            await API.instance.post(`keywords/categories/${id}/bulk`, formData);
            refetch();
            showNotification("Failed to upload keywords");
        }
        catch (e) {
            showNotification("Failed to upload keywords", ALERT_VARIANTS.DANGER);
        }
    };

    const toKeyword = (id = null) => {
        const link = generateLink(routes.KEYWORD_EDIT, { id });
        navigate(link);
    };

    const addKeyword = () => {
        const link = generateLink(routes.KEYWORD_ADD, { categoryId: id });
        navigate(link);
    };

    const onDeleteKeyword = (id) => {
        setDeletingKeywordId(id);
    };

    const confirmDeleteKeyword = async () => {
        deleteKeyword(deletingKeywordId);
        setDeletingKeywordId(-1);
    };

    const onChangePage = (newPage) => {
        setData([...keywords].splice((newPage - 1) * DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE));
        setPage(newPage);
    }

    useEffect(() => {
        if (isSuccess) {
            setData([...keywords].splice(0, DEFAULT_PAGE_SIZE));
            setMaxPages(keywords.length / DEFAULT_PAGE_SIZE);
            setCount(keywords.length);
        }
    }, [isSuccess, isFetching]);// eslint-disable-line react-hooks/exhaustive-deps

    return <AppLayout title="Keywords">
        <Container>
            <Row>
                <Col xs={4}>
                    <Button onClick={addKeyword}>Add <FaPlus style={{ marginBottom: "3px", marginLeft: "10px" }} /> </Button>
                </Col>
                <Col xs={8}>
                    <input type="file" onChange={onFileChange} />
                    <Button style={{ marginRight: "10px" }} onClick={onFileUpload}>Upload File</Button>
                </Col>
            </Row>
            <TableContainer>
                <Table columns={columns} loading={isLoading}>
                    {data &&
                        data.map((m, i) => {
                            return (
                                <tr key={i}>
                                    <td style={{ width: "40%" }}>{m.keyword}</td>
                                    <td>{m.nation}</td>
                                    <td>{m.active ? "Yes" : "No"}</td>
                                    <td>{m.numberOfRep}</td>
                                    <td>{m.organic ? "Yes" : "No"}</td>
                                    <td>{m.numberOfAdsClicks}</td>
                                    <td>{m.adsOnly ? "Yes" : "No"}</td>
                                    <td>
                                        <Button onClick={() => { toKeyword(m.id) }} style={{ marginRight: "10px" }}>Edit</Button>
                                        <Button loading={isLoadingDeleteKeyword} onClick={() => { onDeleteKeyword(m.id) }} variant="secondary">Delete</Button>
                                    </td>
                                </tr>
                            );
                        })}
                </Table>
            </TableContainer>
            <Row className="align-items-center">
                <PaginationContainer>
                    <Pagination
                        maxPages={maxPages}
                        page={page}
                        onPageChange={onChangePage}
                        count={count}
                    />
                </PaginationContainer>
            </Row>
        </Container>

        <Modal
            show={deletingKeywordId > -1}
            title="Delete Keyword"
            text="Are you sure you want to delete this Keyword?"
            confirmText="Yes"
            declineText="No"
            onConfirm={confirmDeleteKeyword}
            onDecline={() => setDeletingKeywordId(-1)}
        />
    </AppLayout>
};

export default Keywords;