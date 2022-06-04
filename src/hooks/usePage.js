import React from "react";
import { Navigate } from "react-router-dom";

export default function usePage(id) {
  try {
    const module = require(`../pages/${id}.mdx`);
    return { page: <module.default />, meta: module.meta };
  } catch (error) {
    return { page: <Navigate to="/" />, meta: {} };
  }
}
