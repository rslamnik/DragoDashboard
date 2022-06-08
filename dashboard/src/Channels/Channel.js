import React, { useEffect } from "react";
import { Container, Col } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";

import { AppLayout, LinkButton, FormField, Row, Button, Dropdown, Checkbox } from "lib/components";
import { useAppRoutes } from "AppRoutes";
import { useChannel } from "./useChannel";
import { useKeywordCategories } from "Keywords";
import { useCreateChannel } from "./useCreateChannel";
import { useUpdateChannel } from "./useUpdateChannel";

const defaultValues = {
    channelName: '',
    channelDescription: '',
    active: '',
    numberOfRep: '',
    numberOfAds: '',
    adsPercentage: '',
    nation: '',
    keywordCategoryId: '',
    browser: '',
};

const Channel = () => {
    let { id } = useParams();
    const { routes } = useAppRoutes();

    const [data] = useChannel(id);
    const { data: keywordCategories, isSuccess: keywordCategoriesRetrieved } = useKeywordCategories();
    const { isLoading: isLoadingNewChannel, createChannel } = useCreateChannel();
    const { isLoading: isLoadingUpdatingChannel, updateChannel } = useUpdateChannel(id);

    const { control, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: data || defaultValues });

    const onSubmit = data => {
        if (id) {
            updateChannel(data);
        } else {
            createChannel(data);
        }
    };

    useEffect(() => {
        async function setFormData() {
            reset(data);
        }

        if (data && keywordCategoriesRetrieved) {
            setFormData();
        }
    }, [data, reset, keywordCategoriesRetrieved]);

    return <AppLayout title="Edit channel">
        <Container>
            <Row>
                <Col>
                    <LinkButton variant="secondary" to={routes.CHANNELS.path}>
                        Back to Channel List
                    </LinkButton>
                </Col>
            </Row>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col>
                        <h2>Channel details</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormField
                            control={control}
                            label="Channel name"
                            error={errors.channelName?.message}
                            name="channelName"
                        />
                    </Col>
                    <Col>
                        <FormField
                            control={control}
                            label="Channel description"
                            error={errors.channelDescription?.message}
                            name="channelDescription"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col style={{ display: "flex", alignItems: "center" }}>
                        <FormField
                            control={control}
                            label="Active"
                            error={errors.active?.message}
                            name="active"
                            component={Checkbox}
                        />
                    </Col>
                    <Col>
                        <FormField
                            control={control}
                            label="Number of Rep"
                            error={errors.numberOfRep?.message}
                            name="numberOfRep"
                        />
                    </Col>
                    <Col>
                        <FormField
                            control={control}
                            label="Number of Ads"
                            error={errors.numberOfAds?.message}
                            name="numberOfAds"
                        />
                    </Col>
                    <Col>
                        <FormField
                            control={control}
                            label="Ads percentage"
                            error={errors.adsPercentage?.message}
                            name="adsPercentage"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormField
                            control={control}
                            label="Nation"
                            error={errors.nation?.message}
                            name="nation"
                        />
                    </Col>
                    <Col style={{ display: "flex", alignItems: "flex-end" }}>
                        <FormField
                            control={control}
                            label="Keyword Category"
                            error={errors.keywordCategoryId?.message}
                            name="keywordCategoryId"
                            component={Dropdown}
                            items={keywordCategories}
                            valueKey="keywordCategoryId"
                            placeholder="Select Keyword Category"
                        />
                    </Col>
                    <Col>
                        <FormField
                            control={control}
                            label="Browser"
                            error={errors.browser?.message}
                            name="browser"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button type="submit" loading={isLoadingNewChannel || isLoadingUpdatingChannel}>Save</Button>
                    </Col>
                </Row>
            </form>

        </Container>
    </AppLayout>
};

export default Channel;