import "../Styles/App.css";
const Tutorial = () => {
  return (
    <div
      style={{
        display: "flex",
        margin: "50px auto auto auto",
        width: "50%",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div>
        <h2 className="regular-text" style={{ textAlign: "center" }}>
          Trộn đề
        </h2>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/aarpcE--YPU"
          title="Trộn đề"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          style={{
            marginLeft: "auto",
            marginRight: "auto"
          }}
        ></iframe>
      </div>
    </div>
  );
};

export default Tutorial;
