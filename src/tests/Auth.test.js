import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import Auth from "../components/Auth";

beforeAll(() => {
    server.listen();
});
afterEach(() => {
    server.resetHandlers();
    cleanup();
});
afterAll(() => {
    server.close();
});

describe("Sample Test Cases", () => {
    let store;
    beforeEach(() => {
        store = configureStore({
            reducer: {
                auth: authReducer,
            },
        });
    });
    it("1 :Should render all the elements correctly", async () => {
        render(
            <Provider store={store}>
                <Auth />
            </Provider>
        );
        // screen.debug(); //取得した画面情報はscreenに保存されている。この文言でscreenの内容を確認することができる。
        expect(true).toBe(true);
    });
});