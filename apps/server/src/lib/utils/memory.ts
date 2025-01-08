const formatMemoryUsage = (bytes: number) => `${Math.round((bytes / 1024 / 1024) * 100) / 100} MB`;

export const startCheckMemoryInterval = (interval: number) =>
  setInterval(() => {
    const memoryUsage = process.memoryUsage();
    console.log('====== Memory Usage ======');
    console.log(`- RSS         : ${formatMemoryUsage(memoryUsage.rss)}`);
    console.log(`- Heap Total  : ${formatMemoryUsage(memoryUsage.heapTotal)}`);
    console.log(`- Heap Used   : ${formatMemoryUsage(memoryUsage.heapUsed)}`);
    console.log(`- External    : ${formatMemoryUsage(memoryUsage.external)}`);
    console.log(`- ArrayBuffers: ${formatMemoryUsage(memoryUsage.arrayBuffers)}`);
  }, interval);
