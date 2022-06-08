import React, { useEffect } from "react";
import { Container, Col } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";

import { AppLayout, LinkButton, FormField, Row, Button } from "lib/components";
import { useAppRoutes } from "AppRoutes";
import { useProxy } from "./useProxy";
import { useCreateProxy } from "./useCreateProxy";
import { useUpdateProxy } from "./useUpdateProxy";

const defaultValues = {
    proxyName: '',
    proxyServer: '',
    proxyUsername: '',
    proxyPassword: ''
};

const Proxy = () => {
    let { id } = useParams();
    const { routes } = useAppRoutes();

    const [data] = useProxy(id);
    const { isLoading: isLoadingNewProxy, createProxy } = useCreateProxy();
    const { isLoading: isLoadingUpdatingProxy, updateProxy } = useUpdateProxy(id);

    const { control, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: data || defaultValues });

    const onSubmit = data => {
        if (id) {
            updateProxy(data);
        } else {
            createProxy(data);
        }
    };

    useEffect(() => {
        async function setFormData() {
            reset(data);
        }

        if (data) {
            setFormData();
        }
    }, [data, reset])

    return <AppLayout title="Edit machine">
        <Container>
            <Row>
                <Col>
                    <LinkButton variant="secondary" to={routes.PROXIES.path}>
                        Back to Proxy List
                    </LinkButton>
                </Col>
            </Row>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col>
                        <h2>Proxy details</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormField
                            control={control}
                            label="Proxy name"
                            error={errors.proxyName?.message}
                            name="proxyName"
                        />
                    </Col>
                    <Col>
                        <FormField
                            control={control}
                            label="Proxy server"
                            error={errors.proxyServer?.message}
                            name="proxyServer"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormField
                            control={control}
                            label="Proxy username"
                            error={errors.proxyUsername?.message}
                            name="proxyUsername"
                        />
                    </Col>
                    <Col>
                        <FormField
                            control={control}
                            label="Proxy password"
                            error={errors.proxyPassword?.message}
                            name="proxyPassword"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button type="submit" loading={isLoadingNewProxy || isLoadingUpdatingProxy}>Save</Button>
                    </Col>
                </Row>
            </form>

        </Container>
    </AppLayout>
};

export default Proxy;