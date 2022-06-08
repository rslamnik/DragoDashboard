import React, { useEffect } from "react";
import { Container, Col } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";

import { AppLayout, LinkButton, FormField, Row, Button, Checkbox, Dropdown } from "lib/components";
import { useAppRoutes, generateLink } from "AppRoutes";
import { useKeyword } from "./useKeyword";
import { useKeywordCategories } from "Keywords";
import { useCreateKeyword } from "./useCreateKeyword";
import { useUpdateKeyword } from "./useUpdateKeyword";

const Keyword = () => {
    let { id, categoryId } = useParams();
    const { routes } = useAppRoutes();

    const defaultValues = {
        keyword: "",
        nation: "",
        active: false,
        numberOfRep: 0,
        date: new Date(),
        organic: false,
        numberOfAdsClicks: 0,
        adsOnly: false,
        categoryId: parseInt(categoryId, 10),
        volume: 0,
        keywordDifficulty: 0,
        cpcUsd: 0,
        competitiveDensity: 0,
        numberOfResults: 0,
        intent: "",
        serpFeatures: "",
        trend: ""
    };

    const [data] = useKeyword(id);
    const { data: keywordCategories, isSuccess: keywordCategoriesRetrieved } = useKeywordCategories();
    const { isLoading: isLoadingNewKeyword, createKeyword } = useCreateKeyword();
    const { isLoading: isLoadingUpdatingKeyword, updateKeyword } = useUpdateKeyword(id);

    const { control, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: data || defaultValues });

    const onSubmit = data => {
        if (id) {
            updateKeyword(data);
        } else {
            createKeyword(data);
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

    const link = categoryId || data?.categoryId ? generateLink(routes.KEYWORDS, { categoryId: categoryId || data?.categoryId }) : '';

    return <AppLayout title="Keyword">
        <Container>
            <Row>
                <Col>
                    <LinkButton variant="secondary" to={link}>
                        Back to Keywords
                    </LinkButton>
                </Col>
            </Row>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col>
                        <h2>Keyword details</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormField
                            control={control}
                            label="Keyword"
                            error={errors.keyword?.message}
                            name="keyword"
                        />
                    </Col>
                    <Col>
                        <FormField
                            control={control}
                            label="Nation"
                            error={errors.nation?.message}
                            name="nation"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormField
                            control={control}
                            label="Number of rep"
                            error={errors.numberOfRep?.message}
                            name="numberOfRep"
                        />
                    </Col>
                    <Col>
                        <FormField
                            control={control}
                            label="Number of ads click"
                            error={errors.numberOfAdsClicks?.message}
                            name="numberOfAdsClicks"
                        />
                    </Col>
                    <Col style={{ display: "flex", alignItems: "flex-end" }}>
                        <FormField
                            control={control}
                            label="Category"
                            error={errors.categoryId?.message}
                            name="categoryId"
                            component={Dropdown}
                            items={keywordCategories}
                            valueKey="keywordCategoryId"
                            placeholder="Select Category"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col style={{ display: "flex", alignItems: "flex-end" }}>
                        <FormField
                            control={control}
                            label="Ads only"
                            error={errors.adsOnly?.message}
                            name="adsOnly"
                            component={Checkbox} />
                    </Col>

                    <Col style={{ display: "flex", alignItems: "flex-end" }}>
                        <FormField
                            control={control}
                            label="Organic"
                            error={errors.organic?.message}
                            name="organic"
                            component={Checkbox}
                        />
                    </Col>

                    <Col style={{ display: "flex", alignItems: "flex-end" }}>
                        <FormField
                            control={control}
                            label="Active"
                            error={errors.active?.message}
                            name="active"
                            component={Checkbox}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button type="submit" loading={isLoadingNewKeyword || isLoadingUpdatingKeyword}>Save</Button>
                    </Col>
                </Row>
            </form>

        </Container>
    </AppLayout>
};

export default Keyword;