import { useLayoutEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Card } from "../components/interfaces";
import JSON5 from "json5";

import OpenAI from "openai";

import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: "dT7cw2riuGM_E8hDOnZ4Xr2z_MgjupXfYgfRQbVDkhQ",
  //this is demo API key - limited to 50 requests per hour, that is, 16 Basic and 10 Detailed Quizes per hour
});

const fetchImage = async (query: string): Promise<string | undefined> => {
  try {
    const result = await unsplash.search.getPhotos({
      query,
      page: 1,
      perPage: 1,
      orientation: "portrait",
    });
    console.log(result.response?.results[0]);
    return result.response?.results[0].urls.regular;
  } catch (error) {
    console.error("Error fetching image:", error);
    return "";
  }
};

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

interface OpenAIOverlayProps {
  basicQuestionSet: boolean;
  currentQuestion: string;
  openAIKey: string;
  results: (data: Card[]) => void;
}

export function OpenAIOverlay({
  basicQuestionSet,
  currentQuestion,
  openAIKey,
  results,
}: OpenAIOverlayProps): JSX.Element {
  const openai = new OpenAI({
    apiKey: openAIKey,
    dangerouslyAllowBrowser: true,
  });

  const [userMessage, setUserMessage] = useState<Message[]>(
    returnBaseMessage(basicQuestionSet),
  );

  const [show, setShow] = useState(false);

  const [responses, setResponses] = useState<string[]>([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Attribution: Implemented with ChatGPT -> employs the JSON5 library to parse the JSON provided by GPT into a TS typed object
  const parseCardString = (str: string): Card[] => {
    try {
      return JSON5.parse(str);
    } catch (error) {
      console.error("Error parsing JSON string:", error);
      return [];
    }
  };

  async function hydrateParse(entryResult: Card[]): Promise<Card[]> {
    const newCards = await Promise.all(
      entryResult.map(async (card) => {
        if (card.image === "") {
          const newImage = await fetchImage(card.title);
          console.log(newImage);
          return { ...card, image: newImage };
        }
        return card;
      }),
    );

    return newCards;
  }

  //Set initial, Base Message
  function returnBaseMessage(qSetType: boolean): Message[] {
    if (qSetType) {
      return [
        {
          role: "system",
          content: `You are on a Career Survey site (called FindMyCareer, for University of Delaware students -- especifically on the basic questions page) that contains a form that aims to provide users with feedback concerning their potential careers based on their input to questions, with answers augmented by you, an LLM. You will be receiving answers to the questions below and it is your responsability to analyze the answers provided, as they are provided (one-by-one), and began ideating potential careers based on their answers (essentially, brainstorm as they answer). After the final question, you will generate 2-3 sentences with your conclusive verdict. The user may go back and reanswer the question, keep this in mind. Be personable, though not too verbose. Try as best as you can to provide an insightful answer. Your aim should be to provide the most accurate responses based given the input
            Here are the questions, in the order:
            1. What do you like to do in your free time?
            2. Which of these statements best describes you?
            3. What is the highest level of education completed?
            4. I find myself frequently setting priorities and creating schedules to effectively manage my time and tasks, ensuring that important deadlines are met.
            5. What is your favorite subject when you at school?
            6. How do you handle challenges?
            7. Which aspect of a project excites you the most?
            8. What motivates you to work hard?

            RESPOND WITH "Excited to take a look at your responses!" IF YOU UNDERSTAND
...
            YOU WILL COLLECT SEVEN RESPONSES AND WILL PROVIDE AN OUTPUT THAT IS AN ARRAY OF THE FOLLOWING OBJECT TYPE WHEN YOU ARE GIVEN THE KEYWORD "RUN REPORT":

            interface Card {
                title: string
                info: string
                image: string
            }

            THE OUTPUT WILL BE COMPOSED OF A TSX ARRAY OF CARD WITH 3 POSSIBLE CAREER OPTIONS, THE CAREER NAME IN TITLE, A SHORT DESCRIPTION OF WHY YOU THINK IT'S A GOOD FIT FOR THIS PERSON IN THE INFO FIELD, AND THE IMAGE FIELD SHOULD BE AN EMPTY STRING.

            HERE IS AN EXAMPLE OF THE EXPECTED FINAL OUTPUT:

            [{title: "Career", info: "a", image: ""}, {title: "Career2", info: "a", image: ""}, {title: "Career3", info: "a", image: ""}]

            ONLY HAVE THE ARRAY IN YOUR OUTPUT AFTER "RUN REPORT", NOTHING ELSE
            `,
        },
      ];
    } else {
      return [
        {
          role: "system",
          content: `You are on a Career Survey site (called FindMyCareer, for University of Delaware students -- especifically on the detailed questions page) that contains a form that aims to provide users with feedback concerning their potential careers based on their input to questions, with answers augmented by you, an LLM. You will be receiving answers to the questions below and it is your responsability to analyze the answers provided, as they are provided (one-by-one), and began ideating potential careers based on their answers (essentially, brainstorm as they answer). After the final question, you will generate 2-3 sentences with your conclusive verdict. The user may go back and reanswer the question, keep this in mind. Be personable, though not too verbose. Try as best as you can to provide an insightful answer. Your aim should be to provide the most accurate responses based given the input
            Here are the questions, in the order:
            1. What is most important to you in a job (Multi-Choice/Free-response)
            2. What is your ideal working schedule? (Free-response)
            3. What kind of work environments would you thrive in the most? (Free-response)
            4. What skills do you possess and enjoy using? (Free-response)
            5. Do you prefer working independently or as part of a team? (Free-response)
            6. Are you comfortable working in a fast-paced, high-stress environment or do you prefer a slower pace? (Free-Response)
            7. How do you feel about traveling for work? (Free-Response)

            RESPOND WITH "Excited to take a look at your responses!" IF YOU UNDERSTAND
...
            YOU WILL COLLECT SEVEN RESPONSES AND WILL PROVIDE AN OUTPUT THAT IS AN ARRAY OF THE FOLLOWING OBJECT TYPE WHEN YOU ARE GIVEN THE KEYWORD "RUN REPORT":

            interface Card {
                title: string
                info: string
                image: string
            }

            THE OUTPUT WILL BE COMPOSED OF A TSX ARRAY OF CARD WITH FIVE POSSIBLE CAREER OPTIONS, THE CAREER NAME IN TITLE, A SHORT DESCRIPTION OF WHY YOU THINK IT'S A GOOD FIT FOR THIS PERSON IN THE INFO FIELD, AND THE IMAGE FIELD SHOULD BE AN EMPTY STRING.

            HERE IS AN EXAMPLE OF THE EXPECTED FINAL OUTPUT:

            [{title: "Career", info: "a", image: ""}, {title: "Career2", info: "a", image: ""}, {title: "Career3", info: "a", image: ""}, {title: "Career4", info: "a", image: ""}, {title: "Career5", info: "a", image: ""}]

             ONLY HAVE THE ARRAY IN YOUR OUTPUT AFTER "RUN REPORT", NOTHING ELSE
            `,
        },
      ];
    }
  }

  //Branch: Submit Prompt for either SQ or DQ, return text result
  const agent = (userInput: string): Message[] => {
    const newMessage: Message = {
      role: "user",
      content: userInput,
    };

    const refreshedArray = [...userMessage, newMessage];
    setUserMessage(refreshedArray);

    return refreshedArray;
  };

  useLayoutEffect(() => {
    if (
      currentQuestion !== userMessage[userMessage.length - 1].content &&
      currentQuestion
    ) {
      console.log(currentQuestion);
      async function processLatest(latestSet: Message[]): Promise<string> {
        const response = await openai.chat.completions.create({
          model: "gpt-4",
          messages: latestSet,
        });
        const content = response.choices[0].message.content;
        if (content === null) {
          throw new Error("Message content is null");
        }
        return content;
      }

      async function exec(latestSet: Message[]) {
        const gptRetVal = await processLatest(latestSet);
        if (currentQuestion !== "RUN REPORT") {
          setResponses((prevResponses) => [...prevResponses, gptRetVal]);
        } else {
          let parsedCard = parseCardString(gptRetVal);
          let hydratedCard = await hydrateParse(parsedCard);
          console.log(hydratedCard);
          results(hydratedCard);
        }
      }

      if (currentQuestion === "init") {
        exec(userMessage);
      } else {
        let latestSet = agent(currentQuestion);
        console.log("inner, common");
        exec(latestSet);
      }
    }
  }, [currentQuestion]); // eslint-disable-line react-hooks/exhaustive-deps
  //escaped this lint rule since we only need submit OpenAI API request when the currentQuestion is updated, not necesarily any other dependencies.

  // run through initialization
  // show overlay with report result

  const buttonContainerStyle: React.CSSProperties = {
    position: "relative",
    display: "inline-block",
  };

  const pulsatingDotContainerStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    marginRight: ".75em", // Add some margin space between dot and text
    paddingBottom: "0.25em",
  };

  const pulsatingDotStyle: React.CSSProperties = {
    width: "9px",
    height: "9px",
    backgroundColor: "#00BEFF",
    borderRadius: "50%",
    position: "relative",
    animation:
      "pulseDot 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite",
  };

  const keyframesStyle = `
    @keyframes pulseRing {
      0% { transform: scale(.1); }
      80%, 100% { opacity: 0; }
    }

    @keyframes pulseDot {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }

    .pulsatingDot:before {
      animation: pulseRing 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
      background-color: #00BEFF;
      border-radius: 45px;
      content: '';
      display: block;
      height: 300%;
      left: -100%;
      position: absolute;
      top: -100%;
      width: 300%;
    }
  `;

  return (
    <>
      <div className="d-block mt-3">
        <style>{keyframesStyle}</style>
        <Button
          variant="secondary"
          onClick={handleShow}
          style={buttonContainerStyle}
        >
          <span style={pulsatingDotContainerStyle}>
            <span className="pulsatingDot" style={pulsatingDotStyle}></span>
          </span>
          AI Feedback
        </Button>
      </div>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Live Insight</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {responses.map((response, index) => (
            <Alert key={index} variant="info" className="mb-2">
              {response}
            </Alert>
          ))}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
