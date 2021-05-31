import React from 'react';
import Dropzone from 'react-dropzone';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import HighlightOffOutlined from '@material-ui/icons/HighlightOffOutlined';
import IconButton from '@material-ui/core/IconButton';
import strings from '../../strings';
import InfoPopover from './InfoPopover';

/**
 * Render file dropzone
 */
const FileDrop = ({
    required, accept, maxFiles, label, acceptLabel, info, files, onUpdate,
}) => {
    /**
     * Add new dropped files to file array
     *
     * @param {Array} dropped New dropped files
     */
    const handleDropFiles = (dropped) => {
        let arr = [...files];
        if (arr.length + dropped.length <= maxFiles) {
            arr = arr.concat(dropped.map((file) => Object.assign(file)));
            onUpdate(arr);
        }
    };

    /**
     * Remove file from array
     *
     * @param {Object} e Event
     * @param {int} index File index
     */
    const handleRemoveFile = (e, index) => {
        e.stopPropagation();
        const arr = [...files];
        arr.splice(index, 1);
        onUpdate(arr);
    };

    /**
     * Render file item
     *
     * @param {Object} file File
     * @param {int} index File index
     * @returns List item
     */
    const renderFileItem = (file, index) => (
        <li key={index}>
            <div className="flex items-center py-2">
                <p className="w-44 overflow-hidden overflow-ellipsis whitespace-nowrap">{file.name}</p>
                <span className="absolute right-6">
                    <IconButton edge="end" aria-label="remove" onClick={(e) => handleRemoveFile(e, index)}>
                        <HighlightOffOutlined />
                    </IconButton>
                </span>
            </div>
        </li>
    );

    return (
        <div className="mt-6">
            <FormControl variant="filled" fullWidth>
                {info && (
                    <span className="absolute -left-9 sm:-left-14 top-0">
                        <InfoPopover content={info} />
                    </span>
                )}
                <InputLabel id="file-drop-label">
                    {label}
                    &nbsp;
                    {`(${strings.max} ${maxFiles} ${strings.files}, ${strings.maxSize}) ${required ? '*' : ''}`}
                </InputLabel>
                <Dropzone
                    onDrop={(dropped) => handleDropFiles(dropped)}
                    accept={accept}
                    multiple={maxFiles !== 1}
                    maxFiles={maxFiles}
                    maxSize={parseInt(process.env.REACT_APP_MAX_FILE_SIZE, 10)}
                >
                    {({ getRootProps, getInputProps }) => (
                        <section>
                            <div
                                className="bg-white p-4 mb-6 border border-solid border-gray-300 rounded cursor-pointer text-gray-700"
                                {...getRootProps()}
                            >
                                <input {...getInputProps()} />
                                <div className="text-center mb-4">
                                    <p className="mt-12 text-sm">{strings.dragAndDrop}</p>
                                    <p className="font-light text-sm my-4">{`(${acceptLabel})`}</p>
                                    <hr />
                                </div>
                                <div hidden={files.length === 0}>
                                    <h3 className="font-semibold text-sm mb-2">
                                        {strings.selectedFiles}
                                        :
                                    </h3>
                                    <ul className="list-disc">
                                        {files.map((file, index) => renderFileItem(file, index))}
                                    </ul>
                                </div>
                            </div>
                        </section>
                    )}
                </Dropzone>
            </FormControl>
        </div>
    );
};

export default FileDrop;
