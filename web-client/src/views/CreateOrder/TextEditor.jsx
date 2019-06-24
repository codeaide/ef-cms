/* eslint-disable react/prop-types */
import 'react-quill/dist/quill.snow.css';
import { connect } from '@cerebral/react';
import { sequences, state } from 'cerebral';
import React from 'react';
import ReactQuill, { Quill } from 'react-quill';

const Size = Quill.import('attributors/style/size');
Size.whitelist = ['10px', '12px', '14px', '16px', '18px', '20px'];
Quill.register(Size, true);

export const TextEditor = connect(
  {
    form: state.form,
    onChange: sequences.updateFormValueSequence,
  },
  class TextEditorComponent extends React.Component {
    render() {
      return (
        <ReactQuill
          value={this.props.form.richText}
          onChange={e => {
            this.props.updateFormValueSequence({
              key: 'richText',
              value: e,
            });
          }}
          modules={{
            toolbar: [
              [
                {
                  size: ['10px', '12px', '14px', '16px', '18px', '20px'],
                },
              ],
              ['bold', 'italic', 'underline'],
              [
                { list: 'bullet' },
                { list: 'ordered' },
                { indent: '-1' },
                { indent: '+1' },
              ],
            ],
          }}
          formats={[
            'size',
            'bold',
            'italic',
            'underline',
            'bullet',
            'list',
            'indent',
          ]}
        />
      );
    }
  },
);
