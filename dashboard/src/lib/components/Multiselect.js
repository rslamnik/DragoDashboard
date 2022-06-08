import React from "react";
import { Col, Form } from "react-bootstrap";

// export const Multiselect = ({ items, nameKey = "name", valueKey = "value", name, onChange, value }) => {
//     // const onSelect = (e) => {
//     //     let newValues = [...value];
//     //     if (value.indexOf(e.target.value) > -1) {
//     //         newValues = newValues.filter(v => v[valueKey] !== e.target.value);
//     //     } else {
//     //         newValues = [...newValues, e.target.value];
//     //     }

//     //     onChange(newValues);
//     // }

//     return (
//         <Form.Group as={Col}>
//             {/* <Form.Label>My multiselect</Form.Label> */}
//             <Form.Select multiple={true} controlId={name} onChange={onChange}>
//                 {items?.map((i) => {
//                     return <option key={i[valueKey]} value={i[valueKey]}>{i[nameKey]}</option>
//                 })}
//                 {/* <option value="field1">Field 1</option>
//                 <option value="field2">Field 2</option>
//                 <option value="field3">Field 3</option> */}
//             </Form.Select>
//         </Form.Group>
//     );
// }

export const Multiselect = ({
    label,
    name,
    type,
    register,
    validationSyntax,
    helpText,
    items,
    defaultOption,
    multiple,
    errors,
    nameKey = "name",
    valueKey = "value",
    onChange,
    values
}) => {
    return <>
        <Form.Group controlId={name}>
            {/* <Form.Label>
                {label}
                {validationSyntax.required && <span className="text-red"> *</span>}
            </Form.Label> */}
            <Form.Select
                onChange={onChange}
                multiple={true}
                {...register(name)}
                value={values}
            >
                {defaultOption && <option value="">{defaultOption}</option>}
                {items?.map((item, i) => (
                    <option key={item[valueKey]} value={item[valueKey]} >
                        {item[nameKey]}
                    </option>
                ))}
            </Form.Select>
        </Form.Group>
    </>
};