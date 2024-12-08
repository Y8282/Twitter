import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import {
  Form,
  Error,
  Input,
  Switcher,
  Title,
  Wrapper,
} from "../components/auth.components";

// const errors = {
//   "auth/email-already-in-use": "이미 사용중인 이메일 입니다.",
// };

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (isLoading || name === "" || email === "" || password === "") return;
    try {
      //계정생성
      setLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(credentials.user);
      await updateProfile(credentials.user, {
        displayName: name,
      });
      navigate("/");
      //유저 지정
      //리다이렉션로 홈페이지
    } catch (e) {
      if (e instanceof FirebaseError) {
        if (e.message === "Firebase: Error (auth/email-already-in-use).") {
          setError("이미 사용중인 이메일입니다.");
        }
        console.log(e.code, e.message);
      }

      if (password.length < 6) {
        setError("비밀번호를 길게 입력하세요");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Wrapper>
      <Title>계정생성 </Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="name"
          value={name}
          placeholder="이름"
          type="text"
          required
        />
        <Input
          onChange={onChange}
          name="email"
          value={email}
          placeholder="이메일"
          type="email"
          required
        />
        <Input
          onChange={onChange}
          name="password"
          value={password}
          placeholder="비밀번호"
          type="password"
          required
        />
        <Input type="submit" value={isLoading ? "Loading..." : "계정생성"} />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        아이디가 있으신가요? <Link to="/login">로그인 &rarr;</Link>
      </Switcher>
    </Wrapper>
  );
}
