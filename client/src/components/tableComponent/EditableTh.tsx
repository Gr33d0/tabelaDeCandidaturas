interface EditableThProps {
  value: string;
  onChange: (newValue: string) => void;
}

export default function EditableTh({ value, onChange }: EditableThProps) {
  return (
    <th
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => onChange(e.target.innerText)}
      style={{ cursor: "text" }}
    >
      {value}
    </th>
  );
}
