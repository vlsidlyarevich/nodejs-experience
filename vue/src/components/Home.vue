<template>
    <div class="body-home">
        <div class="intro">
            <div class="container">
                <img v-bind:src="'../../resources/img/Black-panther-paw-print-clipart-1024x683.png'" class="hero"/>
                <div class="hero-unit">
                    <h1 class="font-light">BLOG</h1>
                    <h3>Search what you want.</h3>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="row">
                    <h2>Custom search field(Doesn't work)</h2>
                <div id="custom-search-input">
                    <div class="input-group col-md-12">
                        <input type="text" class="form-control input-lg" placeholder="Buscar"/>
                        <span class="input-group-btn">
                        <button class="btn btn-info btn-lg" type="button">
                            <i class="glyphicon glyphicon-search"></i>
                        </button>
                    </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                quote: ''
            }
        },
        methods: {
            getQuote() {
                this.$http
                    .get('http://localhost:8082/api/hello', (data) => {
                        this.quote = data;
                    })
                    .error((err) => console.log(err))
            }
        }
    }
</script>