import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { AppLayout, Table, Button, TableContainer, Modal } from "lib/components";
import { useAppRoutes, generateLink } from "AppRoutes";
import { useProxies } from "./useProxies";
import { useDeleteProxy } from "./useDeleteProxy";

const columns = [
    {
        label: "proxyName",
        name: "Proxy name",
        sortBy: "proxyName",
        sortable: false,
        sortOrder: null,
    },
    {
        label: "proxyServer",
        name: "Proxy Server",
        sortBy: "proxyServer",
        sortable: false,
        sortOrder: null,
    },
    {
        name: "",
    },
];

const Proxies = () => {
    const { routes } = useAppRoutes();
    const navigate = useNavigate();

    const [deletingProxyId, setDeletingProxyId] = useState(-1);

    const { data, isLoading } = useProxies();

    const {
        deleteProxy,
        isLoading: isLoadingDeleteProxy
    } = useDeleteProxy();

    const toProxy = (id = null) => {
        const link = generateLink(routes.PROXY_EDIT, { id: id });
        navigate(link);
    };

    const addProxy = () => {
        const link = generateLink(routes.PROXY_ADD);
        navigate(link);
    };

    const onDeleteProxy = (id) => {
        setDeletingProxyId(id);
    };

    const confirmDeleteProxy = async () => {
        deleteProxy(deletingProxyId);
        setDeletingProxyId(-1);
    };

    return <AppLayout title="Proxies">
        <Container>
            <Row>
                <Col xs={4}>
                    <Button onClick={addProxy}>Add <FaPlus style={{ marginBottom: "3px", marginLeft: "10px" }} /> </Button>
                </Col>
            </Row>
            <TableContainer>
                <Table columns={columns} loading={isLoading}>
                    {data &&
                        data.map((m, i) => {
                            return (
                                <tr key={i}>
                                    <td style={{ width: "40%" }}>{m.proxyName}</td>
                                    <td style={{ width: "40%" }}>
                                        {m.proxyServer}
                                    </td>
                                    <td>
                                        <Button loading={isLoading} onClick={() => { toProxy(m.id) }} style={{ marginRight: "10px" }}>Edit</Button>
                                        <Button loading={isLoadingDeleteProxy} onClick={() => { onDeleteProxy(m.id) }} variant="secondary">Delete</Button>
                                    </td>
                                </tr>
                            );
                        })}
                </Table>
            </TableContainer>
        </Container>

        <Modal
            show={deletingProxyId > -1}
            title="Delete Proxy"
            text="Are you sure you want to delete this Proxy?"
            confirmText="Yes"
            declineText="No"
            onConfirm={confirmDeleteProxy}
            onDecline={() => setDeletingProxyId(-1)}
        />
    </AppLayout>
};

export default Proxies;