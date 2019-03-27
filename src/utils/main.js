export const sumRowValues = function( rows ) {
    return rows.reduce(
        ( sum, item ) => {
            return item.amount ? +sum + +item.amount : sum
        },
        0
    );
}
