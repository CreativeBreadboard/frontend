export default function TitleBorder(props) {
    return (
        <div class="flex items-center justify-between mt-4">
            <span class="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>
            <a href="/" class="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">{props.title}</a>
            <span class="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
        </div>
    );
}