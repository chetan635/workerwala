import { Avatar, Box, Flex, keyframes } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function UserAvatar({ onOpen, btnRef }) {
  return (
    <div onClick={onOpen} ref={btnRef} className="avatar">
      <Avatar
        size="lg"
        name="Christian Nwamba"
        src="https://bit.ly/code-beast"
      />
    </div>
  );
}
