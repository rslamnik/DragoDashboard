import React, { Suspense } from "react";
import { Dropdown as BootstrapDropdown } from "react-bootstrap";
import styled, { css } from "styled-components";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

const Icon = css`
  font-size: 10px;
  margin-top: 2px;
`;

const Icons = styled.div`
  ${Icon}
  display: flex;
  flex-direction: column;

  && svg {
    color: var(--secondary);
    margin-left: 20px;
  }
`;

export const DropdownIcons = () => (
    <Icons>
        <FaCaretUp />
        <FaCaretDown />
    </Icons>
);

export const TransparentToggle = styled(BootstrapDropdown.Toggle)`
  background-color: transparent !important;
  border: 0;
  color: var(--secondary);
  &:hover,
  &:active,
  &:focus {
    background-color: transparent !important;
    border: 0 !important;
    color: var(--secondary) !important;
    box-shadow: 0 0 0 0 rgba(139, 142, 146, 0.5) !important;
  }

  ::after {
    content: none !important;
  }
`;

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div
        className="custom-dropdown"
        style={{
            borderRadius: "4px",
            border: "solid 1px gray",
            display: "inline-flex",
            padding: "7px",
            cursor: "pointer"
        }}
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        {children}
        < DropdownIcons />
    </div >
));

export const Dropdown = ({
    items,
    placeholder,
    value,
    ToggleComponent = CustomToggle,
    MenuComponent = BootstrapDropdown.Menu,
    onChange,
    nameKey = "name",
    valueKey = "value",
    alignRight,
}) => {

    const displayItem = items?.find(i => i[valueKey] === value);

    return (
        // TODO: implement proper loader
        <Suspense fallback={<div>Loading...</div>}>
            <BootstrapDropdown>
                <BootstrapDropdown.Toggle as={ToggleComponent}>
                    {(displayItem && displayItem[nameKey]) || placeholder}
                </BootstrapDropdown.Toggle>

                {items && (
                    <MenuComponent alignRight={alignRight}>
                        {items.map((item) => {
                            return (
                                <BootstrapDropdown.Item
                                    key={item[valueKey]}
                                    active={value === item[valueKey]}
                                    onClick={() => onChange(item[valueKey])}
                                >
                                    {item[nameKey]}
                                </BootstrapDropdown.Item>
                            );
                        })}
                    </MenuComponent>
                )}

                {!items && <MenuComponent />}
            </BootstrapDropdown>
        </Suspense>
    );
};
