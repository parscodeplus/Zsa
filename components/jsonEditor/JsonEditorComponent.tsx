"use client";
import React, { useState } from 'react';
import JSONEditor from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';

type JsonEditorProps = {
  value: object;
  onChange: (newValue: object) => void;
};

const JsonEditorComponent: React.FC<JsonEditorProps> = ({ value, onChange }) => {
  const handleChange = (e: any) => {
    if (e && e.jsObject) {
      onChange(e.jsObject);
    }
  };

  return (
    <div style={{ height: '500px' }}>
      <JSONEditor
        locale={locale}
        onChange={handleChange}
        value={value}
        theme="light"
      />
    </div>
  );
};

export default JsonEditorComponent;
