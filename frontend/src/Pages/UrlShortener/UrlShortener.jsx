import {
  ActionIcon,
  Button,
  Center,
  Group,
  Image,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core";
import LinkBackground from "../../assets/LinksBackground.png";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Service from "../../utils/http";
import { SHORTEN_URL } from "../../utils/urls";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconCopy, IconReload } from "@tabler/icons-react";
import { useClipboard } from "@mantine/hooks";
import { isValidUrl } from "../../utils/utils";
import { QRCodeSVG } from "qrcode.react";

const URLShortener = () => {
  const service = new Service();

  const [title, setTitle] = useState("");
  const [originalURL, setOriginalURL] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [shortURL, setShortURL] = useState("");
  const [copied, setCopied] = useState(false);

  const clipboard = useClipboard({ timeout: 1000 });

  const getData = async () => {
    const response = await service.post(SHORTEN_URL, {
      originalUrl: originalURL,
      expiresAt: expiryDate,
      title,
    });
    console.log("Response from server:", response);
    return response.data;
  };

  const { mutate } = useMutation({
    mutationFn: getData,
    onSuccess: (data) => {
      console.log("Mutation success data:", data);
      // Clear form fields
      setTitle("");
      setOriginalURL("");
      setExpiryDate("");

      // Set the short URL
      const fullShortURL = `${service.getBaseURL()}/api/url/${data.shortURL}`;
      setShortURL(fullShortURL);

      showNotification({
        title: "Success",
        message: "Short URL Generated",
        color: "green",
      });
    },
    onError: (error) => {
      console.error("Error generating URL:", error);
      showNotification({
        title: "Error",
        message:
          error?.response?.data?.message || "Failed to generate short URL",
        color: "red",
      });
    },
  });

  const validateAndGenerateURL = () => {
    if (
      !originalURL ||
      originalURL.length === 0 ||
      originalURL === "" ||
      !isValidUrl(originalURL)
    ) {
      showNotification({
        title: "Info",
        message: !originalURL
          ? "Original URL is Mandatory to generate Short URL!"
          : "Please Enter A Valid URL",
        color: "indigo",
      });
      return;
    }
    mutate();
  };

  return (
    <Center
      h={"90vh"}
      style={{
        backgroundPosition: "center",
        backgroundSize: "cover",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          width: "100%",
          height: "100px",
          alignItems: "center",
        }}
      >
        {shortURL && shortURL.length && (
          <Button
            variant="outline"
            mt={"md"}
            onClick={() => setShortURL("")}
            mx={"xl"}
            rightSection={<IconReload size={19} />}
          >
            Generate New URL
          </Button>
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          height: "100px",
          alignItems: "center",
        }}
      >
        <Text
          size="50px"
          fw="lighter"
          style={{ textShadow: "2px 2px 10px rgba(0, 0, 0, 0.69)" }}
        >
          Shorten Your URL Here
        </Text>
      </div>
      <Center
        style={{
          height: "95%",
          width: "95%",
          backdropFilter: "blur(10px)",
          borderRadius: "10px",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        {shortURL ? (
          <>
            <Text
              style={{ borderRadius: "10px" }}
              fw={"bolder"}
              size="xl"
              my={"xs"}
              w={400}
              ta={"center"}
            >
              Generated Short URL{" "}
            </Text>
            <div style={{ display: "flex", alignItems: "center" }}>
              <TextInput
                value={shortURL}
                w={400}
                mx="sm"
                readOnly
                styles={{
                  input: {
                    fontSize: "1.1rem",
                    color: "black",
                    height: "50px",
                    borderRadius: "10px",
                  },
                }}
                rightSection={
                  <Tooltip
                    label={clipboard.copied ? "Copied!" : "Copy"}
                    position="left"
                    withArrow
                  >
                    <ActionIcon
                      color="pink"
                      variant="light"
                      onClick={() => {
                        clipboard.copy(shortURL);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 1000);
                      }}
                    >
                      {clipboard.copied ? (
                        <IconCheck size={16} />
                      ) : (
                        <IconCopy size={16} />
                      )}
                    </ActionIcon>
                  </Tooltip>
                }
              />
            </div>
            <Center
              style={{
                height: "150px",
                width: "150px",
                padding: 10,
                background: "white",
                borderRadius: "10px",
                border: "1px solid black",
              }}
              my={"lg"}
            >
              <QRCodeSVG
                imageSettings={{
                  excavate: true,
                  src: "/HomeBackground.png",
                  height: 100,
                  width: 100,
                }}
                value={shortURL}
                size={400}
              >
                <Image src={"/HomeBackground.png"} />
              </QRCodeSVG>
            </Center>
          </>
        ) : (
          <>
            <TextInput
              placeholder="Title of URL"
              w={400}
              radius={"md"}
              my={"lg"}
              label="Title"
              labelProps={{ style: { fontWeight: "bold" } }}
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <TextInput
              placeholder="Paste Original URL"
              w={400}
              radius={"md"}
              mb={"lg"}
              label="Original URL"
              labelProps={{ style: { fontWeight: "bold" } }}
              onChange={(e) => setOriginalURL(e.target.value)}
              aria-valuemax={originalURL}
            />
            <TextInput
              type="date"
              w={400}
              mb={"lg"}
              label="Date of Expiry"
              labelProps={{ style: { fontWeight: "bold" } }}
              onChange={(e) => setExpiryDate(e.target.value)}
              value={expiryDate}
            />
            <Button
              color="blue"
              variant="outline"
              w={400}
              radius={"md"}
              onClick={validateAndGenerateURL}
            >
              Generate And Shorten URL{" "}
            </Button>
          </>
        )}
      </Center>
    </Center>
  );
};

export default URLShortener;
