import { Layout } from "antd";
import React from "react";
import Reservations from "./Reservations";

const { Content, Footer } = Layout;

export default () => (
  <Layout className="layout">
    <Content style={{ padding: "0 50px" }}>
      <div className="site-layout-content" style={{ margin: "100px auto" }}>
        <h1>Reservations</h1>
        <Reservations />
      </div>
    </Content>
  </Layout>
);
