import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { test, expect, vi } from "vitest";

const mockData = [
  { id: "1", title: "React", time: 3 },
  { id: "2", title: "JavaScript", time: 5 },
];

vi.mock("./supabase", () => {
  return {
    supabase: {
      from: () => ({
        select: () => ({
          order: async () => ({
            data: mockData,
            error: null,
          }),
        }),
        insert: async () => ({
          error: null,
        }),
        delete: () => ({
          eq: async () => ({
            error: null,
          }),
        }),
      }),
    },
  };
});

test("タイトルが表示される", async () => {
  render(<App />);

  expect(await screen.findByText(/学習記録アプリ/)).toBeInTheDocument();
});

test("Supabaseから取得した学習記録が表示される", async () => {
  render(<App />);

  expect(await screen.findByText("React:3時間")).toBeInTheDocument();
  expect(await screen.findByText("JavaScript:5時間")).toBeInTheDocument();
});

test("入力なしで登録するとエラーが表示される", async () => {
  const user = userEvent.setup();

  render(<App />);

  await screen.findByText(/学習記録アプリ/);

  await user.click(screen.getByText("登録"));

  expect(
    screen.getByText("入力されていない項目があります")
  ).toBeInTheDocument();
});

test("フォームに学習内容と時間を入力して登録ボタンを押すと入力欄が空になる", async () => {
  const user = userEvent.setup();

  render(<App />);

  await screen.findByText(/学習記録アプリ/);

  await user.type(screen.getByLabelText("学習内容"), "English");
  await user.type(screen.getByLabelText("学習時間"), "5");

  await user.click(screen.getByText("登録"));

  await waitFor(() => {
    expect(screen.getByLabelText("学習内容")).toHaveValue("");
    expect(screen.getByLabelText("学習時間")).toHaveValue("");
  });
});