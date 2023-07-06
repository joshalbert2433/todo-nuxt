<script setup>
const { data: todos, pending, refresh, execute } = await useFetch("/api/todos");

const handleSubmit = async (event) => {
	event.preventDefault();

	const formData = new FormData(event.target);

	const formValue = Object.fromEntries(formData);

	const formTitle = event.target.title;

	try {
		if (formTitle.value.length < 5) {
			alert("Min char is 5");
			return;
		}

		const response = await fetch("/api/todos", {
			method: "POST",
			body: JSON.stringify(formValue),
		});

		if (response.ok) {
			console.log("Data submitted successfully!");
			formTitle.value = "";
			refresh();
		} else {
			console.error("Failed to submit data");
		}
	} catch (error) {
		console.error("Error occurred while submitting data:", error);
	}
};

const handleCompleteToggle = async (event, id, isCompleted) => {
	console.log(isCompleted);
	try {
		const response = await fetch(`/api/todos/${id}`, {
			method: "PATCH",
			body: JSON.stringify({
				completed: !isCompleted,
			}),
		});
		if (response.ok) {
			console.log("Data updated");
			refresh();
		} else {
			console.error("Failed to submit data");
		}
	} catch (error) {
		console.error("Error occurred while submitting data:", error);
	}
};
</script>

<template>
	<div
		class="min-h-screen bg-[#161622] text-[#FFFDFF] px-8 bg-[url(../assets/images/bg-mobile-dark.jpg)] bg-no-repeat bg-contain sm:bg-[url(../assets/images/bg-desktop-dark.jpg)]"
	>
		<div class="max-w-[700px] mx-auto">
			<div class="flex justify-between items-center pt-12">
				<p class="font-bold tracking-[10px] text-2xl">TODO</p>
				<img
					src="~/assets/images/icon-sun.svg"
					alt="sun"
					class="h-fit"
				/>
			</div>
			<form
				@submit="handleSubmit"
				class="flex p-3 px-6 gap-4 bg-[#25273C] items-center rounded mt-12"
			>
				<div
					class="rounded-full w-[20px] h-[20px] border border-[#686B82]"
				></div>
				<input
					type="text"
					name="title"
					placeholder="Create a new todo..."
					class="bg-inherit outline-none text-[#9FA1B9] w-full"
				/>
			</form>

			<div
				class="bg-[#25273C] rounded mt-8 divide-y divide-[#686B82] divide-opacity-80"
			>
				<div
					v-for="(todo, index) in todos"
					:key="index"
					class="flex justify-between items-center"
				>
					<div
						@click="
							handleCompleteToggle(
								event,
								todo._id,
								todo.completed
							)
						"
						class="flex gap-4 py-4 px-6 w-full cursor-pointer hover:bg-[#181A28]"
					>
						<div
							class="flex justify-center items-center rounded-full w-[20px] h-[20px] border border-[#686B82]"
							:class="
								todo.completed
									? 'bg-gradient-to-br from-[#57DDFF] to-[#C058F3]'
									: ''
							"
						>
							<img
								v-if="todo.completed"
								src="~/assets/images/icon-check.svg"
								alt="check"
							/>
						</div>
						<div
							class="select-none"
							:class="
								todo.completed
									? 'line-through text-[#686B82] '
									: ''
							"
						>
							{{ todo.title }}
						</div>
					</div>
				</div>

				<!-- ITEM COUNT -->
				<div
					v-if="todos.length !== 0"
					class="flex py-4 px-6 justify-between items-center"
				>
					<div class="text-[#686B82]">
						{{ todos.length }}
						{{ todos.length > 1 ? "items" : "item" }} left
					</div>
				</div>
			</div>

			<div
				v-if="todos.length !== 0"
				class="flex gap-4 text-[#9FA1B9] font-bold bg-[#25273C] rounded mt-6 justify-center py-4"
			>
				<div class="text-[#4367BE] cursor-pointer">All</div>
				<div
					class="cursor-pointer"
					@click="
						() => {
							todos.filter((todo) => {
								return (todo.completed = true);
							});
						}
					"
				>
					Active
				</div>
				<div class="cursor-pointer">Completed</div>
			</div>

			<div
				v-if="todos.length !== 0"
				class="mt-10 flex justify-center text-[#9FA1B9]"
			>
				Drag and drop to reorder list
			</div>
		</div>
	</div>
</template>
