import React from 'react';

export function InputBox({ label, placeholder, type = "text", value, onChange }) {
    return (
        <div>
            <div className="text-sky-200 text-xl font-semibold py-2 px-2">{label}</div>
            <div className="text-lg inline-block py-1 px-2 justify-center items-center text-sky-200 border-2 rounded-lg border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]">
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="px-1 bg-transparent outline-none text-sky-200"
                />
            </div>
        </div>
    );
}
