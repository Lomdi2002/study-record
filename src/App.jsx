import { StudyForm } from "./Components/StudyForm";
import { StudyList } from "./Components/StudyList";
import { TotalStudyTime } from "./Components/TotalStudyTime";
import "./App.css";
import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export const App = () => {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const onChangeTitle = (e) => setTitle(e.target.value);
  const onChangeTime = (e) => setTime(e.target.value);

  // Step8：Supabaseからデータを取得する
  const fetchRecords = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("study-record")
      .select("*")
      .order("title", { ascending: true });

    if (error) {
      console.error(error);
      setError("データの取得に失敗しました");
      setLoading(false);
      return;
    }

    setRecords(data);
    setLoading(false);
  };

  // Step8：画面が開いたタイミングで一度だけ取得する
  useEffect(() => {
    fetchRecords();
  }, []);

  // Step10：登録ボタンを押したとき
  const onClickRecord = async () => {
    if (title === "" || time === "") {
      setError("入力されていない項目があります");
      return;
    }

    const { error } = await supabase
      .from("study-record")
      .insert([
        {
          title: title,
          time: Number(time),
        },
      ]);

    if (error) {
      console.error(error);
      setError("登録に失敗しました");
      return;
    }

    setTitle("");
    setTime("");
    setError("");

    fetchRecords();
  };

  // Step11：削除ボタンを押したとき
  const onClickDelete = async (id) => {
    const { error } = await supabase
      .from("study-record")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      setError("削除に失敗しました");
      return;
    }

    fetchRecords();
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>学習記録アプリ</h1>

      <StudyForm
        title={title}
        onChangeTitle={onChangeTitle}
        time={time}
        onChangeTime={onChangeTime}
        onClick={onClickRecord}
        error={error}
      />

      <StudyList records={records} onClickDelete={onClickDelete} />

      <TotalStudyTime records={records} />
    </>
  );
};

export default App;