export const StudyForm = (props) => {
  const { title, onChangeTitle, time, onChangeTime, onClick, error } = props;

  return (
    <div>
      <label>
        <p>学習内容</p>
        <input value={title} onChange={onChangeTitle} />
      </label>

      <label>
        <p>学習時間</p>
        <input value={time} onChange={onChangeTime} />
      </label>

      <p>入力されている学習内容：{title}</p>
      <p>入力されている時間：{time}</p>

      <button onClick={onClick}>登録</button>

      {error !== "" && <p className="error-message">{error}</p>}
    </div>
  );
};