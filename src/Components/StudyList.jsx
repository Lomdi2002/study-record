export const StudyList = (props) => {
  const { records, onClickDelete } = props;

  return (
    <ul>
      {records.map((record) => (
        <li key={record.id}>
          {record.title}:{record.time}時間
          <button onClick={() => onClickDelete(record.id)}>
            削除
          </button>
        </li>
      ))}
    </ul>
  );
};