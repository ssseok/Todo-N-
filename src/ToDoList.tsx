import React from "react";
// import { useState } from "react";
import { useForm } from "react-hook-form";

// export default function ToDoList() {
//   const [toDo, setToDo] = useState("");

//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setToDo(value);
//   };

//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     console.log(toDo);
//     setToDo("");
//   };

//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input onChange={onChange} value={toDo} placeholder="Write a to do" />
//         <button>Add</button>
//       </form>
//     </div>
//   );
// }
interface IFormData {
  [key: string]: string;
}

// interface IForm {
//   email: string;
//   firstName: string;
//   lastName: string;
//   username: string;
//   password: string;
//   password1: string;
// }

export default function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IFormData>({
    defaultValues: {
      email: "@naver.com",
    },
  });

  console.log(errors);

  const onValid = (data: IFormData) => {
    if (data.password !== data.password1) {
      setError(
        "password1",
        { message: "패스워드가 다릅니다." },
        { shouldFocus: true }
      );
    }
  };

  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("email", {
            required: "이메일을 입력해주세요.",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "naver.com 주소만 허용합니다.",
            },
          })}
          placeholder="Email"
        />
        <span>{errors?.email?.message}</span>
        <input
          {...register("username", {
            required: "이름을 입력해주세요.",
            minLength: 4,
            validate: {
              noSeok: (value) =>
                value.includes("seok")
                  ? "seok 라는 이름은 사용 불가 합니다."
                  : true,
            },
          })}
          placeholder="UserName"
        />
        <span>{errors?.username?.message}</span>
        <input
          {...register("password", {
            required: "비밀번호를 입력해주세요.",
            minLength: {
              value: 5,
              message: "패스워드가 너무 짧습니다.",
            },
          })}
          placeholder="password"
        />
        <span>{errors?.password?.message}</span>
        <input
          {...register("password1", {
            required: "비밀번호 확인을 입력해주세요.",
            minLength: 5,
          })}
          placeholder="password1"
        />
        <span>{errors?.password1?.message}</span>
        <button>Add</button>
      </form>
    </div>
  );
}
