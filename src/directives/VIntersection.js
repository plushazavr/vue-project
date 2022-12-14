export default {
  mounted(el, binding) {
    console.log(el, binding);

    // Intersection Observer API для бесконечного скролла (отслеживание пересечения како-либо элемента)
    const options = {
      rootMargin: '0px',
      threshold: 1.0
    }
    const callback = (entries, observer) => {
      if(entries[0].isIntersecting) {
        binding.value();
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(el); //наблюдаем за текущим элементом к которому привязана директива
  },
  name: 'intersection'
}