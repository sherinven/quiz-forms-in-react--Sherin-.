import React from "react";

function SectionTitle({ icon: Icon, title }) {
  return (
    <h3 className="section-title">
      <Icon className="icon" />
      {title}
    </h3>
  );
}

export default SectionTitle;