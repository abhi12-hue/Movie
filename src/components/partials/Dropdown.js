import React from 'react';

const Dropdown = ({ title, options, func }) => {
    return (
        <div className='select'>
            <select defaultValue="0" name='format' id='format' onChange={func}>
                <option value="0" disabled>
                    {title}
                </option>
                {options.map((o, i) => (
                    <option key={i} value={o}>
                        {o.toUpperCase()}
                    </option>
                ))}
            </select>
            <i className="ri-arrow-down-s-line icon"></i> {/* Icon added */}
        </div>
    );
};

export default Dropdown;
