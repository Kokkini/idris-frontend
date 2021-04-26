import { useEffect, useState } from "react";
import { fabric } from "fabric";
import "../Styles/Comments.css";

const Comments = () => {
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangeComment = (event) => {
    setComment(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      email: email,
      comment: comment,
    };
    try {
      if (payload.comment !== null && payload.comment !== "") {
        let url = "https://backend.idris-edu.com/add-comment";
        // let url = "http://localhost:5000/add-comment"
        const response = await fetch(url, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          alert("Xảy ra lỗi, vui lòng thử lại");
          throw new Error("response not ok");
        }
        const data = await response.json();
        console.log(data);
        setEmail("");
        setComment("");
        alert("Cảm ơn bạn đã góp ý!");
      } else {
        alert("Điền góp ý trước khi gửi");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="form-main">
      <div id="form-div">
        <form className="form" id="form1" onSubmit={onSubmit}>
          <div className="email">
            <input
              name="email"
              type="text"
              value={email}
              className="validate[required,custom[email]] feedback-input"
              id="email"
              placeholder="Email"
              onChange={handleChangeEmail}
            />
          </div>
          <div className="text">
            <textarea
              name="text"
              value={comment}
              className="validate[required,length[6,300]] feedback-input"
              id="comment"
              placeholder="Góp ý"
              onChange={handleChangeComment}
            ></textarea>
          </div>
          <div>
            <input type="submit" value="Gửi" id="button-blue" />
            {/* <div className="ease"></div> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Comments;
