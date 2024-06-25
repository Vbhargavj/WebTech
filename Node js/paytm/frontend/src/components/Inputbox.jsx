export function Inputbox({label,placeholder}){
    return <div>
        <div className="text-sm font-medium text-left py-2 p-1">
            {label}
            <input placeholder={placeholder} className="w-full px-2 py-2  border-2 border-gray-600"></input>
        </div>
    </div>
}