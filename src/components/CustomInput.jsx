export default function CustomInput({
  id,
  name,
  label,
  icon,
  type,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div>
      <div className="flex items-center gap-2">
        {icon}
        <label className="mb-3 ml-1 text-0.5xl text-gray-700">{label}</label>
      </div>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
