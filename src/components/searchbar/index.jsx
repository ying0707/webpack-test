import React from "react";
import "./style.less";
import { Input, Icon } from "antd";

const SearchBar = (props) => {
  const { onPressEnter, clickSearch, onChange, placeholder } = props;
  return (
    <div style={{ width: 240, position: "relative", display: "inline-block" }}>
      <Input
        style={{ width: 200, paddingRight: 15, paddingLeft: 14, borderRadius: "20px 0px 0 20px" }}
        placeholder={placeholder}
        onPressEnter={onPressEnter}
        onChange={onChange}
      />
      <div className="suf-search" onClick={clickSearch}>
        <Icon type="search" />
      </div>
    </div>
  );
};
export default SearchBar;
