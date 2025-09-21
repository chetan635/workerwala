import { Avatar } from "@chakra-ui/react";

export default function UserAvatar({ onOpen, btnRef, name, image }) {
  return (
    <div onClick={onOpen} ref={btnRef} className="avatar">
      <Avatar
        size="lg"
        name={name}
        src={image}
      />
    </div>
  );
}
