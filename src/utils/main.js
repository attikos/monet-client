export const sumRowValues = function( rows ) {
    return rows.reduce(
        ( sum, item ) => item.val ? sum + item.val : sum,
        0
    );
}
