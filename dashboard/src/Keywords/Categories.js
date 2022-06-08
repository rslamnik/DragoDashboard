import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { AppLayout, Table, Button, TableContainer, Modal } from "lib/components";
import { useAppRoutes, generateLink } from "AppRoutes";
import { useKeywordCategories } from "./useKeywordCategories";
import { useDeleteKeywordCategory } from "./useDeleteKeywordCategory";

const columns = [
    {
        label: "name",
        name: "Category name",
        sortBy: "name",
        sortable: false,
        sortOrder: null,
    },
    {
        name: "",
    },
];

const Categories = () => {
    const { routes } = useAppRoutes();
    const navigate = useNavigate();

    const [deletingKeywordCategoryId, setDeletingKeywordCategoryId] = useState(-1);

    const { data, isLoading } = useKeywordCategories();

    const {
        deleteKeywordCategory,
        isLoading: isLoadingDeleteKeywordCategory
    } = useDeleteKeywordCategory();

    const toCategory = (id = null) => {
        const link = generateLink(routes.KEYWORD_CATEGORY_EDIT, { id: id });
        navigate(link);
    };

    const addCategory = () => {
        const link = generateLink(routes.KEYWORD_CATEGORY_ADD);
        navigate(link);
    };

    const onDeleteKeywordCategory = (id) => {
        setDeletingKeywordCategoryId(id);
    };

    const confirmDeleteKeywordCategory = async () => {
        deleteKeywordCategory(deletingKeywordCategoryId);
        setDeletingKeywordCategoryId(-1);
    };

    return <AppLayout title="Keyword Categories">
        <Container>
            <Row>
                <Col xs={4}>
                    <Button onClick={addCategory}>Add <FaPlus style={{ marginBottom: "3px", marginLeft: "10px" }} /> </Button>
                </Col>
            </Row>
            <TableContainer>
                <Table columns={columns} loading={isLoading}>
                    {data &&
                        data.map((m, i) => {
                            return (
                                <tr key={i}>
                                    <td style={{ width: "80%" }}>{m.name}</td>
                                    <td>
                                        <Button loading={isLoading} onClick={() => { toCategory(m.keywordCategoryId) }} style={{ marginRight: "10px" }}>Edit</Button>
                                        <Button loading={isLoadingDeleteKeywordCategory} onClick={() => { onDeleteKeywordCategory(m.keywordCategoryId) }} variant="secondary">Delete</Button>
                                    </td>
                                </tr>
                            );
                        })}
                </Table>
            </TableContainer>
        </Container>

        <Modal
            show={deletingKeywordCategoryId > -1}
            title="Delete Keyword Category"
            text="Are you sure you want to delete this Keyword Category?"
            confirmText="Yes"
            declineText="No"
            onConfirm={confirmDeleteKeywordCategory}
            onDecline={() => setDeletingKeywordCategoryId(-1)}
        />
    </AppLayout>
};

export default Categories;