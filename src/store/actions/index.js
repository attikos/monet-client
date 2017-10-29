import { services } from '@/services/';

export default {
    initCallbacks: context => {
        services.incomeCash.on('created', data => {
            context.commit( 'ADD_INCOME_ITEM', data );
        });

        services.incomeCash.on('removed', data => {
            context.commit( 'REMOVE_INCOME_ITEM', data );
        });

        services.incomeCash.on('updated', data => {
            context.commit( 'UPDATE_INCOME_ITEM', data );
        });


        services.costCash.on('created', data => {
            context.commit( 'ADD_COST_ITEM', data );
        });

        services.costCash.on('removed', data => {
            context.commit( 'REMOVE_COST_ITEM', data );
        });

        services.costCash.on('updated', data => {
            context.commit( 'UPDATE_COST_ITEM', data );
        });


        services.wish.on('created', data => {
            context.commit( 'ADD_WISH_ITEM', data );
        });

        services.wish.on('removed', data => {
            context.commit( 'REMOVE_WISH_ITEM', data );
        });

        services.wish.on('updated', data => {
            context.commit( 'UPDATE_WISH_ITEM', data );
        });
    },
    fetchData: ( context, service ) => {
        services[service].find({}).then( data => {
            context.commit( 'FETCH_DATA', { service, data: data.data } );
        } )
    }
}
