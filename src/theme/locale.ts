export const viVN = {
    props: {
        MuiTablePagination: {
            backIconButtonText: 'Trang trước',
            labelRowsPerPage: 'Số dòng trên trang:',
            labelDisplayedRows: ({ from, to, count }: { from: number, to: number, count: number }) => `Hiển thị kết quả từ ${from} - ${to === -1 ? count : to} trên tổng ${count}`,
            nextIconButtonText: 'Trang sau',
        },
        MuiRating: {
            getLabelText: (value: number) => `${value} Star${value !== 1 ? 's' : ''}`,
        },
        MuiAutocomplete: {
            clearText: 'Xoá',
            closeText: 'Đóng',
            loadingText: 'Đang tải…',
            noOptionsText: 'Không có lựa chọn nào',
            openText: 'Mở',
        },
    },
};