import React, { useState } from 'react';
import { Modal, Button, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useContent } from '../ContentProvider';



const AudioModal: React.FC = () => {
  const { isAudioModalOpen, handleCancelAudioModal } = useContent();


  return (
    <Modal title="欢迎使用chatGPT语音AI🤖️助手" visible={isAudioModalOpen} footer={null} onCancel={handleCancelAudioModal}>
      <p>模式一：按住按钮开始说话，松开按钮结束</p>
    </Modal>
  );
};

export default AudioModal;
