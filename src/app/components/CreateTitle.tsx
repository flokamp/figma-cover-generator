import React, {useState} from 'react';

import {Input} from 'antd';

export interface TitleStepProps {
    nextStep: () => void;
}

const CreateTitle: React.SFC<TitleStepProps> = () => {
    const [input, setInput] = useState('value');

    const handleChange = setterFunc => e => {
        const value = e.target.value;
        setterFunc(value);
    };

    const onTitleSet = () => {
        parent.postMessage({pluginMessage: {type: 'setTitleAndGo', value: input}}, '*');
    };

    return (
        <>
            <h2>What's the title of the project?</h2>
            <Input onChange={handleChange(setInput)} />
            <button onClick={onTitleSet}>Next -></button>
        </>
    );
};

export default CreateTitle;
