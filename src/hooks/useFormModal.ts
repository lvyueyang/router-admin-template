import { useState } from 'react';
import { Form, message } from 'antd';

export const enum ModalType {
  CREATE,
  UPDATE,
}

export const ModalTypeCname = {
  [ModalType.CREATE]: '创建',
  [ModalType.UPDATE]: '修改',
};

class FormModal {
  open = false;
  type: ModalType = ModalType.CREATE;
  submitLoading?: boolean;
}

interface Options<FormValue> {
  submit?: (values: FormValue, modal: FormModal) => Promise<void>;
}

export function useFormModal<FormValue>(options?: Options<FormValue>) {
  const [formModal, setFormModal] = useState(new FormModal());
  const [form] = Form.useForm<FormValue>();

  const formModalShow = (type: ModalType = ModalType.CREATE) => {
    setFormModal((state) => ({
      ...state,
      open: true,
      type,
    }));
  };
  const formModalClose = () => {
    setFormModal((state) => ({
      ...state,
      open: false,
    }));
  };
  const submitHandler = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      setFormModal((state) => ({ ...state, submitLoading: true }));
      await options?.submit?.(values, formModal);
      message.success(`${ModalTypeCname[formModal.type!]}成功`);
      setFormModal((state) => ({ ...state, submitLoading: false, open: false }));
    } catch (e) {
      setFormModal((state) => ({ ...state, submitLoading: false }));
    }
  };
  return {
    form,
    formModal,
    formModalTitle: ModalTypeCname[formModal.type],
    setFormModal,
    formModalShow,
    formModalClose,
    submitHandler,
  };
}
