function CheckBoxForm({ items }) {
  console.log(items);
  return (
    <form>
      <ul>
        {items.map((item) => (
          <li key={item.id} className="flex flex-row justify-between">
            <label htmlFor={item.title}>{item.title}</label>
            <input
              type="checkbox"
              id={item.title}
              name={item.title}
              value={item.id}
            />
          </li>
        ))}
      </ul>
    </form>
  );
}

export default CheckBoxForm;
