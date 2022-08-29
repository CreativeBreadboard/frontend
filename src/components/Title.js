export default function Title(props) {
    return (
        <div>
            <h2 class="text-2xl font-semibold text-center text-gray-700 dark:text-white">{props.title}</h2>
            <p class="text-xl text-center text-gray-600 dark:text-gray-200">{props.description}</p>
        </div>
    );
}