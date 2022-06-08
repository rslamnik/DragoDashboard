import React, { useEffect } from "react";
import { Container, Col } from "react-bootstrap";
import { useParams, Link } from 'react-router-dom';
import { useForm } from "react-hook-form";

import { AppLayout, LinkButton, FormField, Row, Button } from "lib/components";
import { useAppRoutes, generateLink } from "AppRoutes";
import { useKeywordCategory } from "./useKeywordCategory";
import { useCreateKeywordCategory } from "./useCreateKeywordCategory";
import { useUpdateKeywordCategory } from "./useUpdateKeywordCategory";

const defaultValues = {
    name: '',
};

const Category = () => {
    let { id } = useParams();
    const { routes } = useAppRoutes();
    const keywordsLink = generateLink(routes.KEYWORDS, { categoryId: id || '' });

    const { data } = useKeywordCategory(id);
    const { isLoading: isLoadingNewCategory, createKeywordCategory } = useCreateKeywordCategory();
    const { isLoading: isLoadingUpdatingCategory, updateKeywordCategory } = useUpdateKeywordCategory(id);

    const { control, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: data || defaultValues });

    const onSubmit = data => {
        if (id) {
            updateKeywordCategory(data);
        } else {
            createKeywordCategory(data);
        }
    };

    useEffect(() => {
        async function setFormData() {
            reset(data);
        }

        if (data) {
            setFormData();
        }
    }, [data, reset]);

    return <AppLayout title="Edit keyword category">
        <Container>
            <Row>
                <Col>
                    <LinkButton variant="secondary" to={routes.KEYWORD_CATEGORIES.path}>
                        Back to Category List
                    </LinkButton>
                </Col>
            </Row>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col>
                        <h2>Category details</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormField
                            control={control}
                            label="Category name"
                            error={errors.name?.message}
                            name="name"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col style={{ display: "flex", justifyContent: "flex-end" }}>
                        {id && <Link style={{ marginRight: "10px" }} to={keywordsLink}>
                            See keywords
                        </Link>}
                        <Button type="submit" loading={isLoadingNewCategory || isLoadingUpdatingCategory}>Save</Button>
                    </Col>
                </Row>
            </form>

        </Container>
    </AppLayout>
};

export default Category;