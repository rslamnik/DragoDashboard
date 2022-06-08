import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { AppLayout, Table, Button, TableContainer, Modal } from "lib/components";
import { useAppRoutes, generateLink } from "AppRoutes";
import { useChannels } from "./useChannels";
import { useDeleteChannel } from "./useDeleteChannel";

const columns = [
    {
        label: "channelName",
        name: "Channel Name",
        sortBy: "channelName",
        sortable: false,
        sortOrder: null,
    },
    {
        label: "channelDescription",
        name: "ChannelDescription",
        sortBy: "channelDescription",
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
        label: "nation",
        name: "Nation",
        sortBy: "nation",
        sortable: false,
        sortOrder: null,
    },
    {
        label: "browser",
        name: "Browser",
        sortBy: "browser",
        sortable: false,
        sortOrder: null,
    },
    {
        name: "",
    },
];

const Channels = () => {
    const { routes } = useAppRoutes();
    const navigate = useNavigate();

    const [deletingChannelId, setDeletingChannelId] = useState(-1);

    const { data, isLoading } = useChannels();

    const {
        deleteChannel,
        isLoading: isLoadingDeleteChannel
    } = useDeleteChannel();

    const toChannel = (id = null) => {
        const link = generateLink(routes.CHANNEL_EDIT, { id: id });
        navigate(link);
    };

    const addChannel = () => {
        const link = generateLink(routes.CHANNEL_ADD);
        navigate(link);
    };

    const onDeleteChannel = (id) => {
        setDeletingChannelId(id);
    };

    const confirmDeleteChannel = async () => {
        deleteChannel(deletingChannelId);
        setDeletingChannelId(-1);
    };

    return <AppLayout title="Channels">
        <Container>
            <Row>
                <Col xs={4}>
                    <Button onClick={addChannel}>Add <FaPlus style={{ marginBottom: "3px", marginLeft: "10px" }} /> </Button>
                </Col>
            </Row>
            <TableContainer>
                <Table columns={columns} loading={isLoading}>
                    {data &&
                        data.map((m, i) => {
                            return (
                                <tr key={i}>
                                    <td style={{ width: "20%" }}>{m.channelName}</td>
                                    <td>{m.channelDescription}</td>
                                    <td>{m.active}</td>
                                    <td>{m.nation}</td>
                                    <td>{m.browser}</td>
                                    <td>
                                        <Button loading={isLoading} onClick={() => { toChannel(m.id) }} style={{ marginRight: "10px" }}>Edit</Button>
                                        <Button loading={isLoadingDeleteChannel && deletingChannelId === m.id} onClick={() => { onDeleteChannel(m.id) }} variant="secondary">Delete</Button>
                                    </td>
                                </tr>
                            );
                        })}
                </Table>
            </TableContainer>
        </Container>

        <Modal
            show={deletingChannelId > -1}
            title="Delete Channel"
            text="Are you sure you want to delete this Channel?"
            confirmText="Yes"
            declineText="No"
            onConfirm={confirmDeleteChannel}
            onDecline={() => setDeletingChannelId(-1)}
        />
    </AppLayout>
};

export default Channels;