function RoleSwitcher({ role, setRole }) {
  return (
    <div className="role-switcher">
      <label>Role: </label>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="viewer">Viewer (Read Only)</option>
        <option value="admin">Admin (Can Add/Delete)</option>
      </select>
    </div>
  );
}

export default RoleSwitcher;