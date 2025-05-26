import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import PostShare from "../PostShare/PostShare";

function ShareModal({ modalOpened, setModalOpened }) {
  return (
    <>
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        size="60%"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <PostShare />
      </Modal>
    </>
  );
}
export default ShareModal;
