import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { AppLayout, Table, Button, Status, TableContainer } from "lib/components";
import { useMachines } from "./useMachines";
import { useAppRoutes, generateLink } from "AppRoutes";

const columns = [
    {
        label: "machineName",
        name: "Machine name",
        sortBy: "machineName",
        sortable: false,
        sortOrder: null,
    },
    {
        label: "note",
        name: "Note",
        sortBy: "note",
        sortable: false,
        sortOrder: null,
    },
    {
        label: "isOnline",
        name: "Online",
        sortBy: "isOnline",
        sortable: false,
        sortOrder: null,
    },
    {
        name: "",
    },
];

const Machines = () => {
    const { routes } = useAppRoutes();
    const navigate = useNavigate();

    const [
        data,
        isLoading
    ] = useMachines();

    const toMachine = (id = null) => {
        const link = generateLink(routes.MACHINE_EDIT, { id: id });
        navigate(link);
    };

    const addMachine = () => {
        const link = generateLink(routes.MACHINE_ADD);
        navigate(link);
    };

    return <AppLayout title="Machines">
        <Container>
            <Row>
                <Col xs={4}>
                    <Button onClick={addMachine}>Add <FaPlus style={{ marginBottom: "3px", marginLeft: "10px" }} /> </Button>
                </Col>
            </Row>
            <TableContainer>
                <Table columns={columns} loading={isLoading}>
                    {data &&
                        data.map((m, i) => {
                            return (
                                <tr key={i}>
                                    <td style={{ width: "40%" }}>{m.machineName}</td>
                                    <td style={{ width: "40%" }}>
                                        {m.note}
                                    </td>
                                    <td><Status active={m.isOnline} /></td>
                                    <td>
                                        <Button loading={isLoading} onClick={() => { toMachine(m.id) }}>Edit</Button>
                                    </td>
                                </tr>
                            );
                        })}
                </Table>
            </TableContainer>
        </Container>
    </AppLayout>
}

export default Machines;