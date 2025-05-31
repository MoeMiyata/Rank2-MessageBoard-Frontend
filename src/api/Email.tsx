// React側例（verify-email.tsx）
const token = new URLSearchParams(window.location.search).get('token');
fetch(`/api/user/verify-email?token=${token}`)
  .then((res) => res.json())
  .then((data) => alert(data.message));
