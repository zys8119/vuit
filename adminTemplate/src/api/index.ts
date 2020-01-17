import Interface from "./Interface"
import statistics from "./modules/statistics"
import term from "./modules/term"
import dashboard_user from "./modules/dashboard_user"
import dashboard_proposal from "./modules/dashboard_proposal"
import auth from "./modules/auth"
import otherApi from "./modules/otherApi"
import organize from "./modules/organize"
import role from "./modules/role"
export default <Interface>{
    v1:{
        auth:auth,
        pc:{
            dashboard:{
                statistics:statistics,
                user:dashboard_user,
                proposal:dashboard_proposal
            },
            common:{
                term:term,
                organize:organize,
            }
        }
    },
    v2:{
        pc:{
            permission:{
                role:role,
            }
        }
    },
    otherApi,
}