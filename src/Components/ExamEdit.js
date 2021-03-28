import { useEffect, useState } from "react";
import { fabric } from "fabric";

const ExamEdit = ({ base64, anno, setGetUserAnno }) => {
  const MIN_BOX_SIZE = 4;
  const QUESTION_LABEL_COLOR = "#24C7F2";
  const ANSWER_LABEL_COLOR = "#00ff00";
  const DRAWING_COLOR = "#ffa500";
  const NULL_COLOR = "purple";
  const STROKE_WIDTH = 4;
  console.log(anno);
  const [canvas, setCanvas] = useState(null);
  const [drawing, setDrawing] = useState(false);
  let firstPoint = null;
  const [currentColor, setCurrentColor] = useState(DRAWING_COLOR);
  let drawingRect = null;
  const [annoWithRect, setAnnoWithRect] = useState(null);
  const [examDisplayed, setExamDisplayed] = useState(false);
  const [annoDisplayed, setAnnoDisplayed] = useState(false);

  // var drawing = false;
  // var firstPoint = null;
  useEffect(() => {
    if (!canvas) {
      setCanvas(initCanvas());
      return;
    }
    if (!examDisplayed) {
      loadExam(canvas, base64);
    }
    if (!annoDisplayed) {
      displayAnno(canvas, anno);
    }
    setGetUserAnno(getUserAnno)
    canvas.on("mouse:up", onMouseUp);
    canvas.on("mouse:down", onMouseDown);
    canvas.on("mouse:move", onMouseMove);
    return () => {
      canvas.off("object:added");
      canvas.off("object:removed");
      resetEventListeners();
    };
  }, [canvas, drawing, annoWithRect, currentColor, base64, anno]);

  const onMouseUp = (event) => {
    if (firstPoint === null) return;
    if (drawing) {
      if (
        Math.abs(drawingRect.width) < MIN_BOX_SIZE ||
        Math.abs(drawingRect.height) < MIN_BOX_SIZE
      ) {
        drawingRect.set("stroke", NULL_COLOR);
        canvas.remove(drawingRect);
      } else {
        drawingRect.set("stroke", currentColor);
        if (currentColor === ANSWER_LABEL_COLOR) {
          annoWithRect["user_anno"]["answer_labels"].push(drawingRect);
          // setAnnoWithRect(annoWithRect)
          console.log(annoWithRect["user_anno"]["answer_labels"]);
        } else if (currentColor === QUESTION_LABEL_COLOR) {
          annoWithRect["user_anno"]["question_labels"].push(drawingRect);
          // setAnnoWithRect(annoWithRect)
        }
      }
      canvas.requestRenderAll();
      drawingRect = null;
      firstPoint = null;
    } else {
      return;
    }
  };
  function onMouseDown(event) {
    console.log(drawing);
    if (drawing) {
      firstPoint = [event.pointer.x, event.pointer.y];
      drawingRect = new fabric.Rect({
        left: firstPoint[0],
        top: firstPoint[1],
        height: 1,
        width: 1,
        fill: null,
        stroke: DRAWING_COLOR,
        strokeWidth: STROKE_WIDTH,
        selectable: false,
      });
      // drawingRect.hasRotatingPoint = false
      canvas.add(drawingRect);
    } else {
      return;
    }
  }

  function onMouseMove(event) {
    if (firstPoint === null || firstPoint === null) return;
    if (drawing) {
      let width = event.pointer.x - firstPoint[0];
      let height = event.pointer.y - firstPoint[1];
      drawingRect.set("width", width).set("height", height);
      canvas.requestRenderAll();
    } else {
      return;
    }
  }

  const setObjectsSelectable = (canvas, selectable) => {
    canvas.getObjects().forEach((obj) => {
      obj.selectable = selectable;
    });
  };

  const initCanvas = () => {
    let canvas = new fabric.Canvas("canvas", {
      height: 1500,
      width: 1000,
    });
    document.addEventListener("keyup", (e) => {
      if (e.key === "Backspace" || e.key === "Delete") {
        console.log(e);
        deleteObjects(canvas);
      }
    });

    return canvas;
  };
  const addRect = (canvas) => {
    const rect = new fabric.Rect({
      height: 280,
      width: 200,
      fill: "yellow",
    });
    // rect.hasRotatingPoint = false
    canvas.add(rect);
    canvas.requestRenderAll();
  };

  const addBox = (canvas, box, color, selectable) => {
    if (box === null) {
      return null;
    }
    const rect = new fabric.Rect({
      left: box[0],
      top: box[1],
      height: box[3] - box[1],
      width: box[2] - box[0],
      fill: null,
      stroke: color,
      strokeWidth: STROKE_WIDTH,
      selectable: selectable,
    });
    // rect.hasRotatingPoint = false
    canvas.add(rect);
    canvas.requestRenderAll();
    return rect;
  };

  const loadExam = (canvas, base64) => {
    if (!base64) return;
    console.log(base64);
    fabric.Image.fromURL(base64, (img) => {
      canvas.backgroundImage = img;
      canvas.requestRenderAll();
    });
    setExamDisplayed(true);
  };

  const displayAnno = (canvas, anno) => {
    if (!anno) return;
    let new_qas = [];
    for (var qa of anno["question-answers"]) {
      let new_qa = {};
      let qbox = addBox(
        canvas,
        qa["question_label"],
        QUESTION_LABEL_COLOR,
        !drawing
      );
      new_qa["question_label"] = qbox;
      new_qa["answers"] = {};
      for (var aLabel in qa["answers"]) {
        if (aLabel.includes("label")) {
          let abox = addBox(
            canvas,
            qa["answers"][aLabel],
            ANSWER_LABEL_COLOR,
            !drawing
          );
          new_qa["answers"][aLabel] = abox;
        }
      }
      new_qas.push(new_qa);
    }
    setAnnoWithRect({
      "question-answers": new_qas,
      user_anno: { question_labels: [], answer_labels: [] },
    });
    setAnnoDisplayed(true);
  };

  const deleteObjects = (canvas) => {
    console.log(canvas.getActiveObject);
    var selection = canvas.getActiveObject();

    if (!selection) {
      console.log("no object selected");
      return;
    }
    if (selection.type === "activeSelection") {
      selection.forEachObject(function (element) {
        element.set("stroke", NULL_COLOR);
        canvas.remove(element);
      });
    } else {
      selection.set("stroke", NULL_COLOR);
      canvas.remove(selection);
    }
    canvas.discardActiveObject();
    canvas.requestRenderAll();
  };

  const resetEventListeners = () => {
    if (canvas.__eventListeners) {
      canvas.__eventListeners["mouse:down"] = [];
      canvas.__eventListeners["mouse:up"] = [];
      canvas.__eventListeners["mouse:move"] = [];
    }
  };

  const startDrawing = () => {
    // resetEventListeners();
    setDrawing(true);
    // drawing = true;
    console.log("drawing", drawing);
    canvas.selection = false;
    setObjectsSelectable(canvas, false);
  };

  const startDrawingQuestionLabel = () => {
    setCurrentColor(QUESTION_LABEL_COLOR);
    startDrawing();
  };

  const startDrawingAnswerLabel = () => {
    setCurrentColor(ANSWER_LABEL_COLOR);
    startDrawing();
  };

  const startSelecting = () => {
    // resetEventListeners();
    setDrawing(false);
    canvas.selection = true;
    setObjectsSelectable(canvas, true);
  };

  const myLog = () => {
    console.log("drawing", drawing);
    console.log("firstPoint", firstPoint);
  };

  const objectIsRemoved = (obj) => {
    return obj.stroke === NULL_COLOR;
  };

  const rectToBbox = (rect) => {
    let width = rect.width
    let height = rect.height
    if("scaleX" in rect){
      width = width * rect.scaleX      
    }
    if("scaleY" in rect){
      height = height * rect.scaleY
    }
    let x1 = rect.left;
    let x2 = rect.left + width;
    let y1 = rect.top;
    let y2 = rect.top + height;
    return [
      Math.min(x1, x2),
      Math.min(y1, y2),
      Math.max(x1, x2),
      Math.max(y1, y2),
    ];
  };

  const getUserAnno = () => {
    // loop through annoWithRect, remove all NULL_COLOR rect
    // if the answer labels doesn't have a question labels, remove them all from question-answers
    // and put them in user_anno
    console.log("annoWithRect", annoWithRect);
    let res = {
      "question-answers": [],
      user_anno: { question_labels: [], answer_labels: [] },
    };
    for (let qa of annoWithRect["question-answers"]) {
      if (qa["question_label"]===null || objectIsRemoved(qa["question_label"])) {
        for (let aLabel in qa["answers"]) {
          let rect = qa["answers"][aLabel];
          if (!objectIsRemoved(rect)) {
            res["user_anno"]["answer_labels"].push(rectToBbox(rect));
          }
        }
      } else {
        let new_qa = { answers: {} };
        new_qa["question_label"] = rectToBbox(qa["question_label"]);
        for (let aLabel in qa["answers"]) {
          let rect = qa["answers"][aLabel];
          if (!objectIsRemoved(rect)) {
            new_qa["answers"][aLabel] = rectToBbox(rect);
          }
        }
        res["question-answers"].push(new_qa);
      }
    }
    for (let rect of annoWithRect["user_anno"]["question_labels"]) {
      if (objectIsRemoved(rect)) continue;
      res["user_anno"]["question_labels"].push(rectToBbox(rect));
    }
    for (let rect of annoWithRect["user_anno"]["answer_labels"]) {
      if (objectIsRemoved(rect)) continue;
      res["user_anno"]["answer_labels"].push(rectToBbox(rect));
    }
    console.log(res);
    return res;
  };

  // const submit = () => {
  //   const userAnno = getUserAnno()
  //   onSubmit(userAnno);
  // }

  return (
    <div>
      {/* <h1>Fabric.js on React - fabric.Canvas('...')</h1> */}
      <button onClick={startSelecting}>Chọn</button>
      <button onClick={startDrawingQuestionLabel}>Khoanh câu hỏi</button>
      <button onClick={startDrawingAnswerLabel}>Khoanh đáp án</button>
      <button onClick={() => deleteObjects(canvas)}>Xoá</button>
      {/* <button onClick={getUserAnno}>Get User Anno</button> */}
      {/* <button onClick={submit}>Submit</button> */}
      <canvas id="canvas" />
    </div>
  );
};

export default ExamEdit;
